# Urban Luxe - E-Commerce Apparel Store

Urban Luxe is a <u>fictional</u> and comprehensive e-commerce apparel web project aimed at honing my front-end development skills. The objective was to build a fully functional and visually appealing online store from the ground up, utilizing frameworks such as Next.js and React while minimizing the use of external libraries. Additionally, the project focused on developing with backend integration in mind to achieve a robust and scalable architecture, while also emphasizing learning and implementing SEO best practices.

### Features

- Simulates a real-world project by using mock data and mock backend logic to handle user interactions and data processing
- User-friendly product search and filtering functionality
- Responsive design for optimal viewing on various devices
- Smooth animations and transitions for enhanced user experience
- Effective state management by utilizing local browser storage and context APIs
- Implemented metadata and sitemap to improve SEO by providing crucial information about the website to search engines, such as the title, description, and keywords. This allows search engines to better understand the content of the website and rank it more appropriately in search results

## Installation

```bash
# Clone the repository:
$ git clone https://github.com/ecdevv/urban-luxe.git

# Navigate into the repository:
$ cd /urban-luxe

# Install dependencies:
$ npm install

# Run the app:
$ npm start or npm run dev
```

## Notes/Potential Improvements/Known Issues

### Notes

- Attempted to make everything reusable and from scratch
- I limited the use of external libraries to these: react-transition-group, react-swipeable (for mobile swiping), sharp for more optimized image processing, and ts-node to execute the BlurData .ts script at build time
- I didn't use any Tailwind, but removing it seems to remove some default styling so I just kept it in
- Collections and Checkout buttons do not do anything and just relink to the homepage
- Login and Registration pages do not have any functionality
- Search functionality on the front-end is very simple and likely would not work as well on a much larger scale
- Mobile Navbar/Menu is a separate component instead of just reusing the original component
- Mock data may not be the most scalable and should likely be split into different schemas/tables (I only used 2 .json files)
- On the Product page, real products would likely be using lighter and more consistent backgrounds for images, which would allow for the dark border on selected options to stand out more

### Potential Improvements

- Improve the emphasis on user actions such as adding products to a shopping cart or signing up for a newsletter
- Consider adding more visual elements to various pages such as sliders or showcases for a better user experience 
  - The current simplicity of the front page, for example, makes it a good starting point, but there's room for more engaging and interactive elements
  - Product page could definitely use something like a review section
  - Could add additional headers/navigation to store and product pages

### Known Issues

- On the Store page, the transitions on the filter menu are buggy on Firefox
- Carousel on Front page has weird lines in the borders on Microsoft Edge (haven't tested on other browsers besides Firefox)
- Image Carousels on the store page does not properly set the first index correctly whenever user changes the images in the carousel and then selects from or to the FIRST option only
- Repeatedly changing the URL/clicking on the link to store/product pages that is not exactly the same as the validated URLs will cause it to be pushed in to the browser history (using UpdateURL component)

## Credits

<strong>Tools & Frameworks:</strong> HTML, CSS, Typescript, Next.js, React

<strong>Libraries Used:</strong> react-transition-group, react-swipeable, sharp, ts-node

<strong>Design Inspiration:</strong> Louis Vuitton, Versace, Gymshark, Nike, Adidas

<strong>Images:</strong> Unsplash

### Images

#### Home Carousel

- Photo 1 by [Force Majeure](https://unsplash.com/photos/woman-and-man-posing-for-photoshoot-a08wHxn7p7A)
- Photo 2 by [Michael DeMoya](https://unsplash.com/photos/2-women-standing-near-wall-during-daytime-qI8xWRvfgGg)
- Photo 3 by [JC Gellidon](https://unsplash.com/photos/woman-leaning-on-wall-OGy5tojr7x8)
- Photo 4 by [Marie-Michèle Bouchard](https://unsplash.com/photos/man-in-white-shirt-and-pants-sitting-on-gray-concrete-floor-J_zYSwczKYA)

#### Products

- Atelier x Luxe Limited Edition Jacket
  - Photo 1 by [Kazi Mizan](https://unsplash.com/photos/a-man-in-a-black-suit-and-scarf-TjvKuYy2kuk)
  - Photo 2 by [Ali Pazani](https://unsplash.com/photos/person-wearing-black-coat-intLk-WtEcA)
  - Photo 3 by [Samia Liamani](https://unsplash.com/photos/woman-in-black-coat-holding-her-chin-Z_wD2N7K_wQ)

- Luxe Mercury
  - Photo 1 by [Adriaan Venner Scheepers](https://unsplash.com/photos/a-man-in-a-gray-hoodie-standing-in-front-of-a-wall-qHnmgJya2Zg)
  - Photo 2 by [Rico Cori](https://unsplash.com/photos/man-standing-near-grey-wlal-eIjEDkRzbOQ)
  - Photo 3 by [Sebastian Pociecha](https://unsplash.com/photos/man-in-green-hoodie-standing-beside-white-brick-wall-D86EPYMO6iE)

- Luxe Jupiter M
  - Photo 1 by [Karsten Winegeart](https://unsplash.com/photos/a-man-in-an-orange-jacket-and-sunglasses-j30dP1-EOeQ)
  - Photo 2 by [Clay Banks](https://unsplash.com/photos/person-in-orange-cap-and-jacket-by-mountain-slopes-om_K0istrAg)
  - Photo 3 by [Sami Sadeghi](https://unsplash.com/photos/a-woman-in-an-orange-jacket-ov6Ok3zQFuE)

- Luxe Jupiter W
  - Photo 1 by [Wesley Tingey](https://unsplash.com/photos/a-woman-with-pink-hair-wearing-a-yellow-jacket-6QWmZhLnFeQ)
  - Photo 2 by [Daniel Bowman](https://unsplash.com/photos/shallow-focus-photography-of-person-facing-trees-fkYugzeEDZo)
  - Photo 3 by [Soha Sh](https://unsplash.com/photos/a-woman-in-an-orange-jacket-ov6Ok3zQFuE)

- Luxe Neptune
  - Photo 1 by [Fabio Nenci](https://unsplash.com/photos/a-man-in-a-blue-sweat-suit-leaning-against-a-blue-wall-4f4Rfvnz6kY)
  - Photo 2 by [Leon Skibitzki](https://unsplash.com/photos/blue-and-white-balenciaga-hoodie-zUxd0TJo0Do)
  - Photo 3 by [Tony Eight Media](https://unsplash.com/photos/a-man-in-a-blue-hoodie-sitting-on-a-bench-WWcxE-MkhNw)

- Luxe Saturn
  - Photo 1 by [Dom Hill](https://unsplash.com/photos/woman-in-yellow-tracksuit-standing-on-basketball-court-side-nimElTcTNyY)
  - Photo 2 by [Karsten Winegeart](https://unsplash.com/photos/a-person-in-a-yellow-jacket-is-walking-through-a-tunnel-VPMV6X5OACQ)
  - Photo 3 by [Soha Sh](https://unsplash.com/photos/a-woman-in-a-yellow-raincoat-standing-next-to-a-van-aRAV1ou7W6I)

- Generic T-Shirt & Generic Shoe
  - (White Option)
    - Photo 1 by [Anomaly](https://unsplash.com/photos/man-wearing-white-crew-neck-t-shirts-WWesmHEgXDs)
    - Photo 2 by [Haryo Setyadi](https://unsplash.com/photos/white-crew-neck-t-shirt-acn5ERAeSb4)
  - (Black Option)
    - Photo 1 by [Luis Quintero](https://unsplash.com/photos/man-wearing-black-crew-neck-t-shirt-3qqiMT2LdR8)
    - Photo 2 by [Sven Ciupka](https://unsplash.com/photos/man-in-black-crew-neck-t-shirt-standing-near-brick-wall-x8Vg7Up6TUc)

#### 404 Not Found Page

- Desktop
  - Photo by [Yuriy Bogdanov](https://unsplash.com/photos/man-wearing-black-coat-leaning-on-brown-brick-wall-MIkxc6WV9QA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
- Mobile
  - Photo by [Jeremy Beadle](https://unsplash.com/photos/man-holding-his-black-suit-qnU-UR0o5X8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)