
Proje XlsParserSpring ile oluşturulmuş endpointleri kullanmaktadır.

Api Endpointler:

1-  POST REQUEST uri:http://localhost:8080/uploadFile
    params: excelFile: excelFile as Form-Data

2-  GET REQUEST uri:http://localhost:8080/parseFile
    params: excelFileName: full-name-of-excel

3-  GET REQUEST uri:http://localhost:8080/downloadFile
    params: jsonFileName: full-name-of-json

Tüm istekler Basic Auth ile username: username, password: pass12 olarak ayarlanmıştır.

![alt text](https://github.com/abdllhyalcn/xlsparser-react/blob/master/screen.jpg?raw=true)