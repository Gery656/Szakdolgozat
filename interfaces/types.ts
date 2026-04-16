export interface Event{
'id' :number
'name' :string
'description' :string
'user_id' : number
'created_at' : string
'updated_at' : string
'mandatoryTo' : MandatoryUser[]
'catalogs' : Catalog[]
}

export interface MandatoryUser{
    'name' : string
    'email' : string
    'identifier': string
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

export interface MandatoryCatalog{
    "id": number
    "name": string
    "lengthInMin": number
    "type": string
    "isGPSNeeded": boolean
    "created_at": string
}

export interface SignedUpUser{
'name' : string
'email' : string
'identifier' : string
'time' : string
}

export interface BluetoothDevice{
'id' : number
'deviceName' : string
'uuid' : string
'code' : string
'user_id' : number
'created_at' : string
'updated_at' : string
}