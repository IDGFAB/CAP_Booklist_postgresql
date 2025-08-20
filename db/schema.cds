using { cuid, managed } from '@sap/cds/common';

namespace my.booklib;

entity Books : cuid, managed {
  title  : String(200);
  author : String(120);
  stock  : Integer  default 0;
  price  : Decimal(9,2) default 0.00;
}