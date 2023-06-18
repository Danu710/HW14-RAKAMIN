import { PrismaClient } from "@prisma/client";
import { Grid } from "@chakra-ui/react";
import Wrapper from "../component/Wrapper";
import Books from "../component/Books";
import Navbar from "../component/Navbar";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return {
      props: {
        books,
      },
    };
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

export default function Home({ books }) {
  return (
    <Wrapper>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {books?.map((book) => (
          <Books key={`${book.id} ${book.title}`} {...book} />
        ))}
      </Grid>
    </Wrapper>
  );
}
