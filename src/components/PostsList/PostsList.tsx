import { useState } from "react";
import { PostItem } from "../PostItem/PostItem";
import './styles.scss'
import { IPost } from "../../types";
import { AddPostForm } from "../AddPostForm/AddPostForm";

interface Props {
  posts: IPost[]
}

export function PostsList({posts}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  function updatePosts() {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsOnCurrentPage = posts.slice(startIndex, endIndex);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return postsOnCurrentPage
  }

  function goToPage(page: number) {
    setCurrentPage(page)
    updatePosts();
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      goToPage(currentPage + 1);
    }
  }
  const currentPosts = updatePosts()

  return (
    <div className="postlist">
      {currentPage === 1 && <AddPostForm />}
      {currentPosts && currentPosts?.map((p) => <PostItem key={p.title} post={p}/>)}
      <div className="postlist-btns">
        <button className={currentPage === 1 ? "text-btn disabled" : "text-btn"} onClick={handlePreviousPage}>← prev</button>
        <p>{currentPage}</p>
        <button className={currentPage === Math.ceil(posts.length / postsPerPage) ? "text-btn disabled" : "text-btn"} onClick={handleNextPage} >next →</button>
      </div>
    </div>
  )
}

