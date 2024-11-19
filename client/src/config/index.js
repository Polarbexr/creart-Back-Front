export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Fotografias" },
      { id: "women", label: "Oleos" },
      { id: "kids", label: "Marcos" },
      { id: "accessories", label: "Colaboradores" },
      { id: "footwear", label: "Eventos" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Oleos" },
      { id: "adidas", label: "Canva Americana" },
      { id: "puma", label: "Canva Algodon" },
      { id: "levi", label: "Embellecidos" },
      { id: "zara", label: "Marcos" },
      { id: "h&m", label: "Fotografias" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Fotografias",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Oleo",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Marcos",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Eventos",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Colaboradores",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Fotografias",
  women: "Oleos",
  kids: "Marcos",
  accessories: "Accessories",
  footwear: "Eventos",
};

export const brandOptionsMap = {
  nike: "Oleos",
  adidas: "Canva Americana",
  puma: "Canva Algodon",
  levi: "Embellecidos",
  zara: "Marcos",  
};

export const filterOptions = {
  category: [
    { id: "men", label: "Fotografias" },
    { id: "women", label: "Oleos" },
    { id: "kids", label: "Marcos" },
    { id: "accessories", label: "Colaboradores" },
    { id: "footwear", label: "Eventos" },
  ],
  brand: [
    { id: "nike", label: "Oleos" },
    { id: "adidas", label: "Canva Americana" },
    { id: "puma", label: "Canva Algodon" },
    { id: "levi", label: "Embellecidos" },
    { id: "zara", label: "Marcos" },
    { id: "h&m", label: "Fotografias" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
