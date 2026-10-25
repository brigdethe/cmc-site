import { imageSources } from '../lib/image-delivery.js';
export default function ResponsiveImage({src,sizes='100vw',loading='lazy',decoding='async',...props}) {
 return <img {...imageSources(src,sizes)} loading={loading} decoding={decoding} {...props}/>;
}
