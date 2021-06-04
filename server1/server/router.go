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
	router.HandleFunc("/getAdminProfile",IsAuthorized(GetProfileEndPoint)).Methods("POST");
	router.HandleFunc("/editAdminProfile",IsAuthorized(EditProfileEndPoint)).Methods("POST");
	router.HandleFunc("/getPatient",IsAuthorized(GetPatientEndPoint)).Methods("GET","OPTIONS")
	router.HandleFunc("/deletePatient",IsAuthorized(DeletePatientEndPoint)).Methods("POST", "OPTIONS")
	router.HandleFunc("/addPatient",IsAuthorized(AddPatientEndPoint)).Methods("POST");
	router.HandleFunc("/getFeedback",IsAuthorized(GetFeedbackEndPoint)).Methods("GET")
	router.HandleFunc("/getDoctor",IsAuthorized(GetDoctorEndPoint)).Methods("GET")
	router.HandleFunc("/deleteDoctor",DeleteDoctorEndPoint).Methods("POST","OPTIONS");
	router.HandleFunc("/addDoctor",IsAuthorized(AddDoctorEndPoint)).Methods("POST");
	router.HandleFunc("/login",LoginEndPoint).Methods("POST","OPTIONS");
	router.HandleFunc("/getDepartment",IsAuthorized(GetDepartmentEndPoint)).Methods("GET");
	router.HandleFunc("/deleteDepartment",IsAuthorized(DelteDepartmentEndPoint)).Methods("Post");
	router.HandleFunc("/addDepartment",IsAuthorized(AddDepartmentEndPoint)).Methods("POST");
	http.ListenAndServe(":12347", handlers.CORS(header, methods, origins)(router))
}