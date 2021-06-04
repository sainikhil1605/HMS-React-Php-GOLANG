package server

import (
	"encoding/json"
	"fmt"
	"net/http"
)
type admin struct{
	Id string
	Name string
	Email string
	Phone string
	Address string
}
func GetProfileEndPoint(w http.ResponseWriter, req *http.Request){
	var p admin
	json.NewDecoder(req.Body).Decode(&p)
	fmt.Println(p);
	rows,er:=db.Query("Select admin_name,email,phone,address FROM `admin` where admin_id="+p.Id);
	if(er==nil){
		for(rows.Next()){
		rows.Scan(&p.Name,&p.Email,&p.Phone,&p.Address);
	}
		json.NewEncoder(w).Encode(p);
		return 
	}else{
		fmt.Println(er);
	}
}
func EditProfileEndPoint(w http.ResponseWriter, req *http.Request){
	var p admin
	json.NewDecoder(req.Body).Decode(&p)
	fmt.Println(p);
	rows,er:=db.Query("update admin set admin_name='"+p.Name+"',email='"+p.Email+"',address='"+p.Address+"',phone='"+p.Phone+"' where admin_id='"+p.Id+"'");
	if(er==nil){
		_=rows
		fmt.Println("Success")
	}else{
		fmt.Println("Failed");
	}
}