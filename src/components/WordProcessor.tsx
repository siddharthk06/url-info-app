
import { PureComponent, ChangeEvent, useState ,useEffect } from "react";
import WordProcessorDataService from "../services/word-processor.service";
import {Row, Col, Container,InputGroup,FormControl, Button} from 'react-bootstrap';
import Loader from "react-loader-spinner";

export default class Fetchdetails extends PureComponent<any,any>{
 constructor(props:any) {
    super(props);
    this.getDetailsForUrl=this.getDetailsForUrl.bind(this);
     this.onChangeUrl = this.onChangeUrl.bind(this);
     this.onChangeResponse = this.onChangeResponse.bind(this);
     this.onChangeHistory = this.onChangeHistory.bind(this);
     this.onChangeLoader = this.onChangeLoader.bind(this);
    this.state = {
       url: "" ,
       result: null,
       history:null,
       historyView:false,
       resultView:false,
       loader:false
    };

  }




    onChangeUrl(e:ChangeEvent<HTMLInputElement>) {
       this.setState({
        url: e.target.value
      });

    }
     onChangeResponse(response:any){
                this.setState({
                        result: response,
                        resultView:true,
                        historyView:false
                    });


                }
      onChangeLoader(data:boolean){
                     this.setState({
                            loader:data
                         });
                     }

                   onChangeHistory(data:any){
                                this.setState({
                                        history: data,
                                        resultView:false,
                                        historyView:true
                                    });


                                }


        async fetchDetails(){

            this.onChangeLoader(true);
            let data=await this.getDetailsForUrl();
            console.log(data);
            this.onChangeResponse(data);
            this.onChangeLoader(false);


        }

         async getAll(){
                    let data=await this.getHistory();
                    console.log(data);
                    this.onChangeHistory(data);
                }



       async getDetailsForUrl(){
          return WordProcessorDataService.fetchForUrl(this.state.url)
            .then((response)=>{
               return response.data.result;

               })
            .catch(e=>{

                console.log(e)
                });

    }

    async getHistory(){
              return WordProcessorDataService.getAll()
                .then((response)=>{
                   return response.data;

                   })
                .catch(e=>{

                    console.log(e)
                    });

        }


render() {

    const { url, result, history ,resultView,historyView,loader} = this.state;


        return(
            <Container fluid="md" className="container">

              <Row>
                <Col sm={8}>
                 <InputGroup className="mb-2">
                    <InputGroup.Text id="basic-addon3">URL</InputGroup.Text>
                    <FormControl
                      id="url"
                      value={url}
                      placeholder="Enter a Website"
                      aria-label="url"
                      onChange={this.onChangeUrl}
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                  </Col >
                  <Col sm={2}>
                  <Button className="mb-2" variant="primary" onClick={()=>this.fetchDetails()}>
                      Word Occurrence
                    </Button>
                    </Col>
                    <Col sm={2}>
                        <Button className="mb-2" variant="primary" onClick={()=>this.getAll()}>
                                       Search History
                         </Button>
                         </Col>
                     </Row>
                     <Row>
                    {loader?<Loader
                                    type="Puff"
                                    color="#00BFFF"
                                    height={100}
                                    width={100}
                                    timeout={20000} //3 secs
                                  />:null}
                    {result&&resultView?(
                                   <ul>
                                  {Object.keys(result).map(function(keyName, keyIndex) {
                                      		return (
                                      		<li key={keyName}>
                                      	            {result[keyName][0]}-{result[keyName][1]}
                                            		</li>
                                      		)
                                  		})}
                                         </ul>):null}

                                   {history&&historyView?  <InputGroup className="mb-2">
                                                                <InputGroup.Text id="basic-addon3">HISTORY</InputGroup.Text>
                                    <ul>
                                            {history.reverse().map(function(name:string, index:number){
                                                        if(name)
                                                     return <li key={ index }>{name}</li>;
                                                   })}
                                         </ul>
                                                              </InputGroup>:null}


              </Row>





            </Container>

            );



}


}