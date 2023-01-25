export default
{
    "id": "Call Report",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "chance": "guid"
      },
      "from_name": {
        "type": "string",
        "faker": "name.findName"
      },
      "from_number": {
        "$ref": "#/definitions/phoneNumber"
      },
      "call_direction": {
        "type": "string",
        "enum": ["inbound", "outbound"]
      },
      "dialed_number": {
        "$ref": "#/definitions/phoneNumber"
      },
      "to_number": {
        "$ref": "#/definitions/phoneNumber"
      },
      "to_name":{
        "type": "string",
        "faker": "name.findName"
      },
      "timestamp": {
        "type": "string",
        "format": "date-time"
      },
      "duration": {
        "type": "integer"
      }
    },
    "required": ["id", "from_number", "to_number", "duration", "timestamp"],
    "definitions": {
      "phoneNumber": {
        "type": "string",
        "maxLength": 12,
        "pattern": "^(\\+(([0-9]){1,2})[-.])?((((([0-9]){2,3})[-.]){1,2}([0-9]{4,10}))|([0-9]{10}))$"
      }
    }
}
