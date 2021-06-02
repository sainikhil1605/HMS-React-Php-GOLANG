package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)
type Auth struct{
	Email string 
	Password string
}
type User struct{
	User_id string
	Name string
}
type Token struct {
	Role        string `json:"role"`
	Email       string `json:"email"`
	TokenString string `json:"token"`
}

type Error struct {
	IsError bool   `json:"isError"`
	Message string `json:"message"`
}

func GenerateJWT(name, user_id string) (string, error) {
	var mySigningKey = []byte("secretkey")
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["authorized"] = true
	claims["name"] = name
	claims["role"]="admin"
	claims["Id"] = user_id
	claims["exp"] = time.Now().Add(time.Minute * 30).Unix()
	tokenString, err := token.SignedString(mySigningKey)
	if err != nil {
		fmt.Errorf("Something Went Wrong: %s", err.Error())
		return "", err
	}
	return tokenString, nil
}
func AdminLoginEndPoint(w http.ResponseWriter, req *http.Request){
	var p Auth
	var temp User;
    err := json.NewDecoder(req.Body).Decode(&p)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
	fmt.Println("Hi");
	fmt.Println(p);
	// fmt.Println("SELECT user_id,name FROM `admin` where email=\""+p.Email+"\" and password=\""+p.Password+"\"")
	rows,er:=db.Query("SELECT `user_id`,`name` FROM `admin` where email=\""+p.Email+"\"and password=\""+p.Password+"\"");
	if(er!=nil){
		fmt.Println(er);
		
	}else{
		// fmt.Println("hi");
		for rows.Next(){
		rows.Scan(&temp.User_id,&temp.Name);
		}
		fmt.Println(temp);
		
	}
	validToken, err := GenerateJWT(temp.Name,temp.User_id)
  
	if err != nil {
	
		return
	}
	var token Token
	// token.Email = temp.Name;
	// token.Role = "admin"
	token.TokenString = validToken
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(token)
}
func AdminIndex(w http.ResponseWriter, r *http.Request){
	if r.Header.Get("Role") != "admin" {
		w.Write([]byte("Not authorized."))
		return ;
	}
	w.Write([]byte("Welcome, Admin."))
}
func SetError(err Error, message string) Error {
	err.IsError = true
	err.Message = message
	return err
}
func IsAuthorized(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// fmt.Println(r.Header);
		if r.Header["Authorization"] == nil {
			var err Error
			err = SetError(err, "No Token Found")
			json.NewEncoder(w).Encode(err)
			return ;
		}

		var mySigningKey = []byte("secretkey")

		token, err := jwt.Parse(r.Header["Authorization"][0], func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("There was an error in parsing token.")
			}
			return mySigningKey, nil
		})

		if err != nil {
			var err Error
			err = SetError(err, "Your Token has been expired.")
			json.NewEncoder(w).Encode(err)
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			if claims["role"] == "admin" {
				r.Header.Set("Role", "admin")
				handler.ServeHTTP(w, r)
				return

			} else if claims["role"] == "user" {
				r.Header.Set("Role", "user")
				handler.ServeHTTP(w, r)
				return

			}
		}
		var reserr Error
		reserr = SetError(reserr, "Not Authorized.")
		json.NewEncoder(w).Encode(err)
	}
}
func S1(){
	router:=mux.NewRouter();
	header := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})
	createConnection();
	// router.HandleFunc("/getPatient",GetPatientEndPoint).Methods("Get")
	router.HandleFunc("/getPatient",IsAuthorized(GetPatientEndPoint)).Methods("GET","OPTIONS")
	router.HandleFunc("/deletePatient",DeletePatientEndPoint).Methods("POST", "OPTIONS")
	router.HandleFunc("/getFeedback",IsAuthorized(GetFeedbackEndPoint)).Methods("GET")
	router.HandleFunc("/getDoctor",IsAuthorized(GetDoctorEndPoint)).Methods("GET")
	router.HandleFunc("/deleteDoctor",DeleteDoctorEndPoint).Methods("POST","OPTIONS");
	router.HandleFunc("/adminLogin",AdminLoginEndPoint).Methods("POST","OPTIONS");
	http.ListenAndServe(":12347", handlers.CORS(header, methods, origins)(router))
}