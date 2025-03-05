let request = require("supertest");

let { app } = require("../index");

let { getAllBooks } = require("../controllers");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllBooks: jest.fn(),
}));

let http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("controller function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return all books", () => {
    let mockBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];
    getAllBooks.mockReturnValue(mockBooks);
    let result = getAllBooks();
    expect(result).toEqual(mockBooks);
    expect(result.length).toBe(3);
  });
  it("GET /books should get all books", async () => {
    let res = await request(server).get("/books");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      books: [
        {
          bookId: 1,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
        },
        {
          bookId: 2,
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
        },
        {
          bookId: 3,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Classic",
        },
      ],
    });
  });
  it("GET /books/details/:id should get a book by ID", async () => {
    let res = await request(server).get("/books/details/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      book: {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
    });
  });
});
