import React, { Component } from 'react' ;
import { Container, Row, Col } from 'reactstrap' ;
import ModalForm from './Components/Modals/Modal' ;
import DataTable from './Components/Tables/DataTable' ;
import { CSVLink } from "react-csv" ;
import 'bootstrap/dist/css/bootstrap.min.css' ;

class operators extends Component {
    state = {
        items: []
      }
    
      getItems(){
        fetch('http://localhost:3000/oper')
          .then(response => response.json())
          .then(items => this.setState({items}))
          .catch(err => console.log(err))
      }
    
      addItemToState = (item) => {
        this.setState(prevState => ({
          items: [...prevState.items, item]
        }))
      }
    
      updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id_operators === item.id_operators)
        const newArray = [
        // destructure all items from beginning to the indexed item
          ...this.state.items.slice(0, itemIndex),
        // add the updated item to the array
          item,
        // add the rest of the items to the array from the index after the replaced item
          ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray })
      }
    
      deleteItemFromState = (id_operators) => {
        const updatedItems = this.state.items.filter(item => item.id_operators !== id_operators)
        this.setState({ items: updatedItems })
      }
    
      componentDidMount(){
        this.getItems()
      }
    
      render() {
        return (
          <Container className="App">
            <Row>
              <Col>
                <h1 style={{margin: "20px 0"}}>Operators</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
              </Col>
            </Row>
            <Row>
              <Col>
                <CSVLink
                  filename={"pipelinevfx_operators.csv"}
                  color="primary"
                  style={{float: "left", marginRight: "10px"}}
                  className="btn btn-primary"
                  data={this.state.items}>
                  Download CSV
                </CSVLink>
                <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
              </Col>
            </Row>
          </Container>
        )
      }
  }

export default {
    routeProps: {
        path: '/operators',
        component: operators
    },
    name: 'Operators',
}