import axios from "axios";

const Post = ({ id, comments }) => (
  <div>
    <h1>comments for post #{id}</h1>
    {comments.map((comment) => {
      return <Comment {...comment} key={comment.id} />;
    })}
  </div>
);

const Comment = ({ email, body }) => (
  <div>
    <h5>{email} </h5>
    <p>{body}</p>
  </div>
);

Post.getInitialProps = async ({ query }) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${query.id}`
  );
  const { data } = res;
  console.log();
  return { ...query, comments: data };
};

export default Post;

// ###################### TWO WAYS TO FETCH THE QUERY ######################

/*
// ########## THE FIRST ONE ############
// Using getInitialProps to fetch the query
const Post = (props) => <h1>YOU ARE LOOKING AT POST #{props.id}</h1>;
Post.getInitialProps = async ({ query }) => {
  return query;
};
export default Post;
*/

/*
// ########## THE OTHER ONE ############
// The same, using a High Order Component called withRouter to fetch the query
import { withRouter } from "next/router";
const Post = (props) => <h1>YOU ARE LOOKING AT POST #{props.router.query.id}</h1>;
export default withRouter(Post);
*/
