import React, { Component } from 'react';
import { Container } from 'reactstrap' ;
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
// import './App.css';

class charts extends Component {
  state = {
    currentZoom: 'Days',
    messages: [],
    data: [],
    links: [
      { id: 1, source: 1, target: 2, type: '0' },
      { id: 2, source: 1, target: 3, type: '1' }
    ]
    /*
    data: {
        data: [
          { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
          { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.9 },
          { id: 3, text: 'Task #3', start_date: '2019-04-20', duration: 5, progress: 0.1 }
        ],
        links: [
          { id: 1, source: 1, target: 2, type: '0' },
          { id: 2, source: 1, target: 3, type: '1' }
        ]
      },*/
  };

  getData(){
    const url = "http://localhost:3000/gantt" ;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("EE INS pre inside getdata this.setstate index.js")
        this.setState({data})
      })
      .catch(err => console.log(err))
  }

  addMessage(message) {
    const maxLogLength = 5;
    const newMessate = { message };
    const messages = [
      newMessate,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  }

  componentDidMount(){
    console.log("YY INS cDM back in index.js")
    this.getData()
    console.log("ZZ INS cDM back in index.js")
  }

  render() {
    const { currentZoom, messages, data, links } = this.state;
    console.log("01 INS First....render index.js")
    console.log(this.state)
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            // tasks={task}
            data={data}
            links={links}
            zoom={currentZoom}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
        <MessageArea
          messages={messages}
        />
      </div>
    );
  }
}

export default {
    routeProps: {
        path: '/gantt',
        component: charts
    },
    name: 'Gantt',
}