
export default interface IResponse {
  code: number;
  header: {};
  message: string;
}

export function default_response(res:any, response:IResponse){
  res.writeHead(response.code, response.header); 
  res.end(response.message); 
}

export function default_error(res:any, e:Error){
  console.log(e);
  res.writeHead(400, {'Content-Type': 'application/json'}); 
  res.end(JSON.stringify("Error")); 
}