import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Page, Toolbar, Button , Tab , Tabbar } from 'react-onsenui'
import Home from './component/home/Home'
import Maps from './component/maps/Maps'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const List = props => 
  <div>
    <h1>{props.data.fasilitas}</h1>
  </div>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: [],
      loading: false,
      err: false,
      err_msg: ''
    };
  }

  componentWillMount() {
    const { loading } = this.state
    this.setState({ loading: true })
    fetch('http://api.jakarta.go.id/ruang-publik/rptra')
      .then(res => res.json())
      .then(data => {
        this.setState({ data} , () => {
          this.setState({ loading: false } , () => {
            console.log(this.state)
          })
        })
      })
      .catch(err => {
        this.setState({ err: true , err_msg: err.message })
      })
  }

  renderToolbar() {
    const titles = ['Home' , 'Map']
    return (
      <Toolbar>
        <div className="center">{titles[this.state.index]}</div>
      </Toolbar>
    )
  }

  renderTabs() {
    return [
      {
        content: <Home />,
        tab: <Tab label='Home' icon='md-home'></Tab>
      },
      {
        content: <Maps />,
        tab: <Tab label='Maps' icon='md-home'></Tab>
      },
    ]
  }

  render() {
    const { err } = this.state
    return (
      <Page>
        <Tabbar 
          swipeable={true}
          position='bottom'
          index={this.state.index}
          onPreChange={(event) =>
            {
              if (event.index != this.state.index) {
                this.setState({index: event.index});
              }
            }
          }
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}

export default App;
