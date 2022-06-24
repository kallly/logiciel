
export default interface IResponse {
  code: number;
  header: {};
  message: string;
}

export function default_response(res:any, response:IResponse){
  //res.writeHead(response.code, response.header); 
  res.send(response.message); 
}

export function default_error(res:any, e:any){
  log.error(e);
  //res.writeHead(400, {'Content-Type': 'application/json'}); 
  res.send(JSON.stringify("Error")); 
}