type Blog = {
  userId: number;
  id: number;
  image?: string;
  title: string;
  body: string;
};

const SingleBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex flex-col sm:flex-row mx-4  my-4 py-4 px-4 bg-slate-100 shadow-md shadow-slate-500 rounded-lg    transition duration-300 ease-in-out cursor-pointer">
      <div className="mr-0  sm:mr-4 w-full sm:w-96  ">
        <img
          src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
          className="w-96 h-48  object-cover rounded-lg"
          alt="blog"
        />
      </div>
      <div className="flex-1 ">
        <h1 className="font-semibold text-lg my-4">{blog.title}</h1>
        <p>
          {blog.body.length > 100
            ? blog.body.substring(0, 500) + "..."
            : blog.body}
        </p>
      </div>
    </div>
  );
};

export default SingleBlog;
