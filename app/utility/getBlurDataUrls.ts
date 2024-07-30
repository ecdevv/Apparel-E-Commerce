import blurDataUrls from '../../data/blurDataUrls.json';

// Since the blurDataUrls json is built in the prebuild, this should be safe to run anytime
export default function getBlurDataUrls(): Record<string, string> {
  return blurDataUrls;
}