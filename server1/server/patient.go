package server

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)
type Patient struct{
	Id string "json:id"
	Name string "json:name omitempty"
	Email string "json:email omitempty"
	Address string "json:address omitempty"
	Phone string "json:phone omitempty"
	Sex string "json:sex omitempty"
}
var db *sql.DB
var pat []Patient
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
   
}
func createConnection(){
	DB,err:=sql.Open("mysql", "root:password1234@tcp(172.17.0.2)/hospital");
	if(err!=nil){
		panic(err);
	}
	db=DB;
}
func GetPatientEndPoint(w http.ResponseWriter, req *http.Request){
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	rows,er:=db.Query("select patient_id,patient_name,email,address,phone,sex from patient");
    fmt.Println(rows)
	pat:=[]Patient{};
      if(er==nil){
         var temp=Patient{}
         for rows.Next(){

            rows.Scan(&temp.Id,&temp.Name,&temp.Email,&temp.Address,&temp.Phone,&temp.Sex);
           
            pat=append(pat,temp);
         }
      }
	  json.NewEncoder(w).Encode(pat)
}


func DeletePatientEndPoint(w http.ResponseWriter, req *http.Request){
	var p Patient
    err := json.NewDecoder(req.Body).Decode(&p)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
	fmt.Println("Hi");
	fmt.Println(p);
	rows,er:=db.Query("DELETE FROM `patient` where patient_id="+p.Id);
	if(er==nil){
		fmt.Fprintf(w,"Success");
	}else{
		_=rows
		fmt.Fprintf(w,"Failed");
	}
    fmt.Fprintf(w, "Person: %+v", p)

}
func S1(){
	router:=mux.NewRouter();
	header := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
origins := handlers.AllowedOrigins([]string{"*"})
	createConnection();
	router.HandleFunc("/getPatient",GetPatientEndPoint).Methods("Get")
	router.HandleFunc("/deletePatient",DeletePatientEndPoint).Methods("POST", "OPTIONS")
	router.HandleFunc("/getFeedback",GetFeedbackEndPoint).Methods("GET")
	router.HandleFunc("/getDoctor",GetDoctorEndPoint).Methods("GET")
	router.HandleFunc("/deleteDoctor",DeleteDoctorEndPoint).Methods("POST","OPTIONS");
	http.ListenAndServe(":12347", handlers.CORS(header, methods, origins)(router))
}