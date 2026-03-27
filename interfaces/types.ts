export interface Event{
'id' :number
'name' :string
'description' :string
'user_id' : number
'created_at' : Date
'updated_at' : Date
'mandatoryTo' : MandatoryUser[]
'catalogs' : Catalog[]
}

export interface MandatoryUser{
    'name' : string
    'email' : string
}

export interface Catalog{
'id' : number
'name' : string
'lengthInMin' : number
'type' : string
'isGPSNeeded' : boolean
'signUpCode' : string |null
'latitude' : number | null
'longitude' : number | null
'qrFileName' : string |null
'event_id' : number
'bluetooth_device_id' : number | null
'created_at' : string
'updated_at' : string
'signedUp' : SignedUpUser[]
}

export interface SignedUpUser{
'name' : string
'email' : string
'time' : Date
}