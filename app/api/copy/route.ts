import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  const srcBuyer = 'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\c6ae9e3a-65bb-48a7-8db8-876c2a31fb1e\\media__1779441316748.png';
  const srcSeller = 'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\c6ae9e3a-65bb-48a7-8db8-876c2a31fb1e\\media__1779441316809.png';
  const srcGdnAd = 'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\c6ae9e3a-65bb-48a7-8db8-876c2a31fb1e\\stayverse_gdn_ad_1779442800659.png';
  const srcAdBanner = 'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\c6ae9e3a-65bb-48a7-8db8-876c2a31fb1e\\stayverse_ad_banner_1779443125663.png';
  const srcAdvisoryBanner = 'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\c6ae9e3a-65bb-48a7-8db8-876c2a31fb1e\\stayverse_advisory_banner_1779444619978.png';
  const srcFacebookBanner = 'C:\\Users\\Nicha_Bz\\.gemini\\antigravity-ide\\brain\\c6ae9e3a-65bb-48a7-8db8-876c2a31fb1e\\stayverse_facebook_banner_1779444638952.png';
  
  const destDir = 'd:\\BA\\stayverse\\public';
  const destBuyer = 'd:\\BA\\stayverse\\public\\buyer-journey.png';
  const destSeller = 'd:\\BA\\stayverse\\public\\seller-journey.png';
  const destGdnAd = 'd:\\BA\\stayverse\\public\\stayverse-ad.png';
  const destAdBanner = 'd:\\BA\\stayverse\\public\\stayverse-ad-banner.png';
  const destAdvisoryBanner = 'd:\\BA\\stayverse\\public\\stayverse-facebook-banner01.png';
  const destFacebookBanner = 'd:\\BA\\stayverse\\public\\stayverse-facebook-banner02.png';
  
  try {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    let copiedBuyer = false;
    let copiedSeller = false;
    let copiedGdnAd = false;
    let copiedAdBanner = false;
    let copiedAdvisoryBanner = false;
    let copiedFacebookBanner = false;
    
    if (fs.existsSync(srcBuyer)) {
      fs.copyFileSync(srcBuyer, destBuyer);
      copiedBuyer = true;
    }
    
    if (fs.existsSync(srcSeller)) {
      fs.copyFileSync(srcSeller, destSeller);
      copiedSeller = true;
    }

    if (fs.existsSync(srcGdnAd)) {
      fs.copyFileSync(srcGdnAd, destGdnAd);
      copiedGdnAd = true;
    }

    if (fs.existsSync(srcAdBanner)) {
      fs.copyFileSync(srcAdBanner, destAdBanner);
      copiedAdBanner = true;
    }

    if (fs.existsSync(srcAdvisoryBanner)) {
      fs.copyFileSync(srcAdvisoryBanner, destAdvisoryBanner);
      copiedAdvisoryBanner = true;
    }

    if (fs.existsSync(srcFacebookBanner)) {
      fs.copyFileSync(srcFacebookBanner, destFacebookBanner);
      copiedFacebookBanner = true;
    }
    
    return NextResponse.json({ 
      success: true, 
      buyer: copiedBuyer ? 'Copied' : 'Not found', 
      seller: copiedSeller ? 'Copied' : 'Not found',
      gdnAd: copiedGdnAd ? 'Copied' : 'Not found',
      adBanner: copiedAdBanner ? 'Copied' : 'Not found',
      advisoryBanner: copiedAdvisoryBanner ? 'Copied' : 'Not found',
      facebookBanner: copiedFacebookBanner ? 'Copied' : 'Not found'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}


