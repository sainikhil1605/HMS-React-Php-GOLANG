package server

import (
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)
func S1(){
	router:=mux.NewRouter();
	header := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})
	createConnection();
	router.HandleFunc("/getPatient",IsAuthorized(GetPatientEndPoint)).Methods("GET","OPTIONS")
	router.HandleFunc("/deletePatient",IsAuthorized(DeletePatientEndPoint)).Methods("POST", "OPTIONS")
	router.HandleFunc("/getFeedback",IsAuthorized(GetFeedbackEndPoint)).Methods("GET")
	router.HandleFunc("/getDoctor",IsAuthorized(GetDoctorEndPoint)).Methods("GET")
	router.HandleFunc("/deleteDoctor",DeleteDoctorEndPoint).Methods("POST","OPTIONS");
	router.HandleFunc("/login",LoginEndPoint).Methods("POST","OPTIONS");
	http.ListenAndServe(":12347", handlers.CORS(header, methods, origins)(router))
}