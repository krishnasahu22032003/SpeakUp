import ComplaintAPI from "../../api/ComplaintApi";

type Complaint = {

image:string[],
title:string,
description :string ,
location:string,
longtitude:number,
latitude :number,
type:"EMERGENCY" | "NON-EMERGENCY"

}

export function CreateComplaint(data:Complaint){

return ComplaintAPI<Complaint>('/create' , {
method:"POST",
body:JSON.stringify(data)
})
}