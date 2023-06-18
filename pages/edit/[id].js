import { useEffect, useState } from "react";
import Wrapper from "../../component/Wrapper";
import { useRouter } from "next/router";
import { getBookDetailById } from "../../modules/fetch";
import BookForm from "../../component/BookForm";
import axios from "axios";

export default function EditBookPage() {
  const [book, setBook] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.put("/api/books/${id}", router.query.id);
        setBook(response.book);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [router.query.id]);

  return (
    <Wrapper>
      <BookForm bookData={book} />
    </Wrapper>
  );
}
