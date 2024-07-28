import React from "react";
import Link from "next/link";
import Image from "next/image";
import './Footer.css'
import AccordionMenu from "../Accordion/AccordionMenu";

const Footer = () => {
  return (
    <section className="footer-container">
      <div className='footer-between-container'>
        <div className="footer-info-container footer-desktop">
          <div className="footer-section-container">
            <h2>ACCOUNT</h2>
            <ul className="footer-links-container">
              <li><Link href="/" className="footer-link">Your Account</Link></li>
              <li><Link href="/" className="footer-link">Track Your Order</Link></li>
            </ul>
          </div>
    
          <div className="footer-section-container">
            <h2>ABOUT</h2>
            <ul className="footer-links-container">
              <li><Link href="/" className="footer-link">Urban Luxe Central</Link></li>
              <li><Link href="/" className="footer-link">About Us</Link></li>
              <li><Link href="/" className="footer-link">Careers</Link></li>
            </ul>
          </div>
    
          <div className="footer-section-container">
            <h2>HELP</h2>
            <ul className="footer-links-container">
              <li><Link href="/" className="footer-link">Help Center & FAQs</Link></li>
              <li><Link href="/" className="footer-link">Shipping & Delivery</Link></li>
              <li><Link href="/" className="footer-link">Returns & Refunds</Link></li>
              <li><Link href="/" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-info-container footer-mobile">
          <div className="footer-section-container">
            <AccordionMenu title="ACCOUNT" headerPadding={20} titleClassName='footer-accordion-title' svgClassName="footer-accordion-svg" hrClassName="footer-accordion-hr">
              <ul className="footer-links-container">
                <li><Link href="/" className="footer-link">Your Account</Link></li>
                <li><Link href="/" className="footer-link">Track Your Order</Link></li>
              </ul>
            </AccordionMenu>
            <AccordionMenu title="ABOUT" headerPadding={20} titleClassName='footer-accordion-title' svgClassName="footer-accordion-svg" hrClassName="footer-accordion-hr">
              <ul className="footer-links-container">
                <li><Link href="/" className="footer-link">Urban Luxe Central</Link></li>
                <li><Link href="/" className="footer-link">About Us</Link></li>
                <li><Link href="/" className="footer-link">Careers</Link></li>
              </ul>
            </AccordionMenu>
            <AccordionMenu title="HELP" headerPadding={20} titleClassName='footer-accordion-title' svgClassName="footer-accordion-svg" hrClassName="footer-accordion-hr">
              <ul className="footer-links-container">
                <li><Link href="/" className="footer-link">Help Center & FAQs</Link></li>
                <li><Link href="/" className="footer-link">Shipping & Delivery</Link></li>
                <li><Link href="/" className="footer-link">Returns & Refunds</Link></li>
                <li><Link href="/" className="footer-link">Privacy Policy</Link></li>
                <li><Link href="/" className="footer-link">Terms & Conditions</Link></li>
              </ul>
            </AccordionMenu>
          </div>
        </div>

        <ul className='footer-socials-container'>
          <li>
            <Link href="/" target="_blank" rel="noreferrer" aria-label='Instagram' className="footer-link">
              <svg 
                aria-hidden
                viewBox="0 0 20 20"
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#FFFFFF"
                width={22}
                height={22}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                  <title>instagram [#167]</title>
                  <desc>Created with Sketch.</desc>
                  <defs> </defs>
                  <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -7439.000000)">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792" id="instagram-[#167]"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </Link>
          </li>
          <li>
            <Link href="/" target="_blank" rel="noreferrer" aria-label='Facebook' className="footer-link">
              <svg 
                aria-hidden
                viewBox="-5 0 20 20"
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#FFFFFF"
                width={22}
                height={22}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                  <title>facebook [#176]</title>
                  <desc>Created with Sketch.</desc>
                  <defs> </defs>
                  <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z" id="facebook-[#176]"></path>
                      </g>
                    </g>
                  </g>
                </g> 
              </svg>
            </Link>
          </li>
          <li>
            <Link href="/" target="_blank" rel="noreferrer" aria-label='Twitter' className="footer-link">
              <svg 
                aria-hidden
                viewBox="0 -2 20 20"
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#FFFFFF"
                width={22}
                height={22}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                  <title>twitter [#154]</title>
                  <desc>Created with Sketch.</desc>
                  <defs> </defs>
                  <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -7521.000000)">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705" id="twitter-[#154]"></path> 
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </Link>
          </li>
          <li>
            <Link href="/" target="_blank" rel="noreferrer" aria-label='Discord' className="footer-link">
              <svg 
                aria-hidden
                viewBox="0 0.5 24 24"
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#FFFFFF"
                width={22}
                height={22}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                  <g clipPath="url(#clip0_525_68)">
                    <path d="M20.317 4.54101C18.7873 3.82774 17.147 3.30224 15.4319 3.00126C15.4007 2.99545 15.3695 3.00997 15.3534 3.039C15.1424 3.4203 14.9087 3.91774 14.7451 4.30873C12.9004 4.02808 11.0652 4.02808 9.25832 4.30873C9.09465 3.90905 8.85248 3.4203 8.64057 3.039C8.62448 3.01094 8.59328 2.99642 8.56205 3.00126C6.84791 3.30128 5.20756 3.82678 3.67693 4.54101C3.66368 4.54681 3.65233 4.5565 3.64479 4.56907C0.533392 9.29283 -0.31895 13.9005 0.0991801 18.451C0.101072 18.4733 0.11337 18.4946 0.130398 18.5081C2.18321 20.0401 4.17171 20.9701 6.12328 21.5866C6.15451 21.5963 6.18761 21.5847 6.20748 21.5585C6.66913 20.9179 7.08064 20.2424 7.43348 19.532C7.4543 19.4904 7.43442 19.441 7.39186 19.4246C6.73913 19.173 6.1176 18.8662 5.51973 18.5178C5.47244 18.4897 5.46865 18.421 5.51216 18.3881C5.63797 18.2923 5.76382 18.1926 5.88396 18.0919C5.90569 18.0736 5.93598 18.0697 5.96153 18.0813C9.88928 19.9036 14.1415 19.9036 18.023 18.0813C18.0485 18.0687 18.0788 18.0726 18.1015 18.091C18.2216 18.1916 18.3475 18.2923 18.4742 18.3881C18.5177 18.421 18.5149 18.4897 18.4676 18.5178C17.8697 18.8729 17.2482 19.173 16.5945 19.4236C16.552 19.4401 16.533 19.4904 16.5538 19.532C16.9143 20.2414 17.3258 20.9169 17.7789 21.5576C17.7978 21.5847 17.8319 21.5963 17.8631 21.5866C19.8241 20.9701 21.8126 20.0401 23.8654 18.5081C23.8834 18.4946 23.8948 18.4742 23.8967 18.452C24.3971 13.1911 23.0585 8.6212 20.3482 4.57004C20.3416 4.5565 20.3303 4.54681 20.317 4.54101ZM8.02002 15.6802C6.8375 15.6802 5.86313 14.577 5.86313 13.222C5.86313 11.8671 6.8186 10.7639 8.02002 10.7639C9.23087 10.7639 10.1958 11.8768 10.1769 13.222C10.1769 14.577 9.22141 15.6802 8.02002 15.6802ZM15.9947 15.6802C14.8123 15.6802 13.8379 14.577 13.8379 13.222C13.8379 11.8671 14.7933 10.7639 15.9947 10.7639C17.2056 10.7639 18.1705 11.8768 18.1516 13.222C18.1516 14.577 17.2056 15.6802 15.9947 15.6802Z"/>
                  </g> 
                  <defs> <clipPath id="clip0_525_68"> <rect width="24" height="24" fill="white"/> </clipPath> </defs> 
                </g>
              </svg>
            </Link>
          </li>
          <li>
            <Link href="/" target="_blank" rel="noreferrer" aria-label='Youtube' className="footer-link">
              <svg
                aria-hidden
                viewBox="0 -3 20 20"
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#FFFFFF"
                width={22}
                height={22}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                  <title>youtube [#168]</title>
                  <desc>Created with Sketch.</desc>
                  <defs> </defs>
                  <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -7442.000000)">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289" id="youtube-[#168]"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-copyright">
        <p>
          © 2024 Urban Luxe. All rights reserved. Site design by{' '}
          <Link href="https://ericchour.vercel.app" aria-label="Author's Website" target="_blank" className="footer-link">Eric Chour</Link>
        </p>
      </div>
    </section>
  );
};

export default Footer;
