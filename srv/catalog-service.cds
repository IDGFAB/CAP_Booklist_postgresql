using my.booklib as db from '../db/schema';

@path: '/catalog'
service CatalogService {
  entity Books as projection on db.Books;
}