import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { PostForm } from "src/components/PostForm";
import { useBlog } from "src/context/Blog";
import { useHistory } from "react-router-dom";
import { initial } from "lodash-es";

export const Dashboard = () => {
  const history = useHistory();
  const [connecting, setConnecting] = useState(false);
  const { connected, select } = useWallet();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  // Static Data

  const {
    user,
    initialized,
    initUser,
    showModal,
    setShowModal,
    createPost,
    posts,
  } = useBlog();

  const onConnect = () => {
    setConnecting(true);
    select(PhantomWalletName);
  };

  useEffect(() => {
    if (user) {
      setConnecting(false);
    }
  }, [user]);

  return (
    <div className="dashboard background-color overflow-auto h-screen">
      <header className="fixed z-10 w-full h-14  shadow-md">
        <div className="flex justify-between items-center h-full container">
          <h2 className="text-2xl font-bold">
            <div className="bg-clip-text bg-gradient-to-br from-indigo-300 colorpink">
              Triog
            </div>
          </h2>
          {connected ? (
            <div className="flex items-center">
              <p className=" font-bold text-sm ml-2  capitalize underlinepink">
                Home
              </p>
              <p className=" font-bold text-sm ml-2 capitalize mr-4 underlinepink">
                Blog
              </p>
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
              />
              <p className=" font-bold text-sm ml-2 capitalize">{user?.name}</p>
              {initialized ? (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Create Post
                </Button>
              ) : (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    initUser();
                  }}
                >
                  Initialize User
                </Button>
              )}
            </div>
          ) : (
            <Button
              loading={connecting}
              className="w-28"
              onClick={onConnect}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            >
              Connect
            </Button>
          )}
        </div>
      </header>
      <main className="dashboard-main pb-4 container flex relative">
        <div className="pt-3">
          {/* <h1 className="title">The Blog</h1> */}
          <div className="row">
            <article className="best-post">
              <div
                className="best-post-image"
                style={{
                  backgroundImage: "url(/trishul.png)",
                }}
              ></div>
              <div className="best-post-content">
                <div className="best-post-content-title">
                 Welcome To Triog !!! 
                </div>
                <div className="best-post-content-sub">
               Welcome to Triog, the premier blogging platform for journalists and whistleblowers who prioritize privacy and security. We understand that those who speak truth to power often face significant risks to their personal safety and well-being. That's why we have created a platform specifically tailored to the needs of those who need to keep their identities and information confidential. With Triog, you can express your opinions and share your stories without fear of retaliation or exposure. Our platform is built on web3 technology, providing an unparalleled level of security and privacy, backed by the power of decentralized, blockchain-based systems. Whether you're an investigative journalist, a whistleblower, or someone who simply values privacy, Triog is the platform for you. Join us today and take control of your voice, your content, and your security.
    <b>Triog is private by default and what's why triog is desinged in way that only one walltet can post a single blog.</b>
                </div>
              </div>
            </article>

            <div className="all__posts">
              {posts.map((item) => {
                return (
                  <article
                    className="post__card-2"
                    onClick={() => {
                      history.push(`/read-post/${item.publicKey.toString()}`);
                    }}
                    key={item.account.id}
                  >
                    <div className="post__card_-2">
                      <div
                        className="post__card__image-2"
                        style={{
                          backgroundImage: 'url(/write.jpg)',
                        }}
                      ></div>
                      <div>
                        <div className="post__card_meta-2">
                          <div className="post__card_cat">
                            <span className="dot"> </span>
                            {item.account.title}{" "}
                             
                          </div>
                          <p className="post__card_alttitle-2">
                            {item.account.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
        <div className={`modal ${showModal && "show-modal"}`}>
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowModal(false)}>
              ×
            </span>
            <PostForm
              postTitle={postTitle}
              postContent={postContent}
              setPostTitle={setPostTitle}
              setPostContent={setPostContent}
              onSubmit={() => createPost(postTitle, postContent)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
