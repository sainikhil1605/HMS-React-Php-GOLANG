package server

import (
	"encoding/json"
	"fmt"
	"net/http"
)
type feedback struct{
	Name string `json:name`
	Email string `json:email`
	Contact string `json:contact`
	Suggestion string `json:suggestion`
}
var feed []feedback
func GetFeedbackEndPoint(w http.ResponseWriter, req *http.Request){
	rows,er:=db.Query("SELECT * FROM `feedback`");
	feed:=[]feedback{};
	if(er==nil){
		fmt.Println("hi")
		var temp feedback
		for rows.Next(){
            rows.Scan(&temp.Name,&temp.Email,&temp.Contact,&temp.Suggestion);
           
            feed=append(feed,temp);
         }
	}
	json.NewEncoder(w).Encode(feed);
}