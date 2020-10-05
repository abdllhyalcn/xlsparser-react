import { AxiosRequestConfig } from 'axios';
import config from '../config';
import axios from 'axios';
import FileResponse from '../ReqModels/FileResponse';

export function downloadJSONReq(fileName: String): String {
    const url = `${config.ReqURL}/downloadFile/`;

    const axiosRequestConfig: AxiosRequestConfig = {
        method: 'get',
        url: url,
        params: {
            jsonFileName: fileName
        },
        responseType: 'blob',
        timeout: config.defaultTimeout,
        auth: {
            username: config.apiUsername,
            password: config.apiPassword
          }
    }

    axios.request(axiosRequestConfig).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName.toString()); //or any other extension
        document.body.appendChild(link);
        link.click();
    }).catch((error) => {
        if(error.response && error.response.message){
            return error.response.message as String;
        }
    })

    return "Finished."
}

export function parseJSONReq(fileName: String){
    const url = `${config.ReqURL}/parseFile/`;

    const axiosRequestConfig: AxiosRequestConfig = {
        method: 'get',
        url: url,
        params: {
            excelFileName: fileName
        },
        responseType: "json",
        timeout: config.defaultTimeout,
        auth: {
            username: config.apiUsername,
            password: config.apiPassword
          }
    }

   return axios.request<FileResponse>(axiosRequestConfig);

}

export function uploadExcel(file: File){
    const url = `${config.ReqURL}/uploadFile/`;
    const formData= new FormData();
    formData.append('excelFile', file)

    const axiosRequestConfig: AxiosRequestConfig = {
        
        headers:{'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: url,
        data: formData,
        responseType: "json",
        timeout: config.defaultTimeout,
        auth: {
            username: config.apiUsername,
            password: config.apiPassword
          }
    }

    return axios.request<FileResponse>(axiosRequestConfig);

}