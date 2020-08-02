import React, { Component } from "react";
import Link from "next/link";
import axios from "axios";

class Index extends Component {
  constructor(props) {
    super(props);
    console.log(
      "CONSTRUCTOR: Data fetching twice, from the server and from the client"
    );
  }

  componentDidMount() {
    console.log("COMPONENT_DID_MOUNT: Data fetching from the client only");
  }

  // If we use a functional component, then we need to defined it like this:
  // Page.getInitialProps = async () => { ... }
  // Both functional and class components could recieve a "ctx" argument (context)
  static async getInitialProps() {
    console.log(
      "GET_INITIAL_PROPS: Data fetching from the server in the initial page load, then from the client"
    );
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const { data } = res;
    return { posts: data };
  }

  render() {
    console.log("**********RUNNING INDEX COMPONENT**********");
    return (
      <>
        <h1>Our Index Page</h1>
        <ul>
          {this.props.posts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/post?id=${post.id}`} as={`/p/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Index;
