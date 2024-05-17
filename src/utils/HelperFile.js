import ImagePaths from "./ImagePaths";

export const ProductDetails = [
  {
    title: 'Add On: Bed Frame Assembly Service',
    description: 'Bed Frame Assembly Service',
    price: '$49.00',
    isAddon: true,
  },
  {
    title: 'Add On: Bed Frame Disposal Service',
    description: 'Bed Frame Assembly Service',
    price: '$49.00',
    isAddon: true,
  },
  {
    title: 'Add On: Bed Frame Assembly Service',
    description: 'Bed Frame Disposal Service',
    price: '$49.00',
    isAddon: true,
  },
  {
    title: 'Our Promise',
    description: [
      'Offers Sturdy, creak-free, durable support',
      'FlexiSlats for added comfort',
      'Natural ash-grain finish',
    ],
    isAddon: false,
  },
  {
    title: 'Meet the Award Winning Bedframe',
    description: [
      'Combines clever design with timeless style',
      'Fast, easy and completely tool-free assembly',
      'Made with sustainable, solid Canadian timber',
    ],
    isAddon: false,
  },
];

export const ProductReviews = [
  {
    name: 'Adam',
    review: 'Perfect comfort on the mattress to sleep on.good product.',
    rating: 4,
    date: `12 May 2023`,
    image: ImagePaths.ReviewUser1
  },
  {
    name: 'Dave',
    review: 'Perfect comfort on the mattress to sleep on.good product.',
    rating: 5,
    date: `12 May 2023`,
    image: ImagePaths.ReviewUser2
  },
  {
    name: 'Percy',
    review: 'Perfect comfort on the mattress to sleep on.good product.',
    rating: 4,
    date: `12 May 2023`,
    image: ImagePaths.ReviewUser2
  },
  {
    name: 'Jackson',
    review: 'Perfect comfort on the mattress to sleep on.good product.',
    rating: 4,
    date: `12 May 2023`,
    image: ImagePaths.ReviewUser1
  },{
    name: 'Eve',
    review: 'Perfect comfort on the mattress to sleep on.good product.',
    rating: 4,
    date: `12 May 2023`,
    image: ImagePaths.ReviewUser3
  },
];


export const ErrorMessages = {
  Warning: 'Warning',
  Error: 'Error',
  Success: 'Success',
  Review : 'We would love to hear feedback from you, please add a review message.',
  FillAllFields : 'Please fill in all required fields.',
  EmailAddress: 'Please enter a valid email address.',
}