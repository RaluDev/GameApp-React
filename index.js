
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: "aqua"
    }
  }

  handleClick = (event) => {
    console.log('click div', event.target);
    this.setState({ color: 'pink' })
  }

  render() {
    const myStyle = {
      marginTop: "30px",
      backgroundColor: this.state.color
    }

    return (
      <div
        className="post"
        style={myStyle}
        onClick={this.handleClick}
      >
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <img className="image" src={this.props.imageUrl}></img>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
    // aici putem pune promisul de fetchPost
    fetch('https://games-app-siit.herokuapp.com/games')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });

  }

  render() {

    var { isLoaded, items } = this.state;

    var listPost = items
      .map(item => (
        <Game
          id={item.id}
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
        />));


    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <div>
          {listPost}
        </div>
      )
    }

  }
}

const appDOM = document.getElementById('app');
ReactDOM.render(<App />, appDOM)





