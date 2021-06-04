package server

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
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
	if req.Header.Get("Role") != "admin" {
		w.Write([]byte("Not authorized."))
		return ;
	}else{
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
