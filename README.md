# internal-node-chart
This project is responsible for generating charts for daily and weekly attendance report in SnapSuite Teams meeting


#Takes a json in the following format:
```json
{
"id":"guid...",
"meeting":"Developer Meeting",    
"attendance":
      {
            "DwainBrowne": "true",
            "JohnPerez": "true",
            "LeoDiaz": "false",
            "MarkBustria": "true",
            "ParmSingh": "true",
            "PavithraPackiyanathan": "true",
            "RedmondParez": "true"
        }
}
```

#Returns
```json
{
  "id":"guid...",
  "meeting": "Developer Meeting",
  "attendance": [
    {
      "name": "DwainBrowne",
      "datetime": "2023-04-12T00:14:48.138-04:00"
    },
    {
      "name": "JohnPerez",
      "datetime": "2023-04-11T00:14:48.138-04:00"
    },
    {
      "name": "LeoDiaz",
      "datetime": "2023-04-10T00:14:48.138-04:00"
    },
    {
      "name": "MarkBustria",
      "datetime": "2023-04-09T00:14:48.138-04:00"
    },
    {
      "name": "ParmSingh",
      "datetime": "2023-04-08T00:14:48.138-04:00"
    },
    {
      "name": "PavithraPackiyanathan",
      "datetime": "2023-04-07T00:14:48.138-04:00"
    },
    {
      "name": "RedmondParez",
      "datetime": "2023-04-06T00:14:48.138-04:00"
    }
  ]
}
```