import React, { Component } from 'react' ;
import { Container, Row, Col } from 'reactstrap' ;
import ModalForm from './Components/Modals/Modal' ;
import DataTable from './Components/Tables/DataTable' ;
import { CSVLink } from "react-csv" ;
import 'bootstrap/dist/css/bootstrap.min.css' ;
import '../../split.css'
import SplitPane from 'react-split-pane'

class projects extends Component {
  state = {
    items: []
  }

  getItems(){
    fetch('http://localhost:3000/proj')
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
    const itemIndex = this.state.items.findIndex(data => data.id_projects === item.id_projects)
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

  deleteItemFromState = (id_projects) => {
    const updatedItems = this.state.items.filter(item => item.id_projects !== id_projects)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
      // First Pane

      <SplitPane split="vertical" defaultSize='33%'>
        <Container className="App">
          <Row>
            <Col>
              <h1 style={{margin: "20px 0"}}>Projects</h1>
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
                filename={"pipelinevfx_projects.csv"}
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

        <SplitPane  defaultSize='50%'>
          <Container className="App">
            <Row>
              <Col>
                <h1 style={{margin: "20px 0"}}>Projects</h1>
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
                  filename={"pipelinevfx_projects.csv"}
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

          <SplitPane defaultSize='100%'>
            <Container className="App">
              <Row>
                <Col>
                  <h1 style={{margin: "20px 0"}}>Projects</h1>
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
                    filename={"pipelinevfx_projects.csv"}
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
          </SplitPane>
        </SplitPane>
      </SplitPane>
    )
  }
}

export default {
    routeProps: {
        path: '/projects',
        component: projects
    },
    name: 'Projects',
}