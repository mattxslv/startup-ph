import React from 'react'
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi'

type Props = {}

function FaqItem({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4">
        <HiOutlineQuestionMarkCircle className="text-highlight h-8 w-8" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xl text-dark font-bold mb-2 md:mb-5">{label}</div>
        <div className="text-muted text-base md:leading-7">
          {children}
        </div>
      </div>
    </div>
  )
}

function Faq({}: Props) {
  return (
    <div className="relative pt-8 md:pt-10 pb-8 md:pb-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-4 md:mb-16">
          <div
            className="text-dark text-2xl md:text-5xl font-bold mb-4 md:mb-7"
            aos-offset="0" data-aos-delay="0" disabled-data-aos="fade-up"
          >
            Frequently<br />Asked Questions
          </div>
          <div
            className="text-muted font-normal md:font-bold"
            aos-offset="0" data-aos-delay="150" disabled-data-aos="fade-up"
          >Answers from the Startup PH Team</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-4 md:gap-y-16" aos-offset="0" data-aos-delay="0" disabled-data-aos="fade-right">
          <FaqItem label="How to Post: Getting Your Account Set Up">
            Newly created accounts will need to complete the <a className="text-highlight">onboarding process</a> before being allowed to post.
          </FaqItem>
          <FaqItem label="What happens after I submit my startup?">
            After submitting, your post will instantly go live. All posts will be visible in the &quot;Newest&quot; feed.
          </FaqItem>
          <FaqItem label="What about my privacy?">
            You&apos;re responsible for all the activity on your account, and for keeping your password confidential.
          </FaqItem>
          <FaqItem label="How can I contact the Start-Up Support Team?">
            Feel free to reach us by email at <a className="text-highlight">support@startup.gov.ph</a>, or through live chat by clicking on the icon at the bottom right of your screen.
          </FaqItem>
          <FaqItem label="Can you remove my post?">
            Once something is submitted, it becomes a lasting part of our community&apos;s history. We preserve even the posts related to things that may have changed or no longer exist, ensuring a valuable record of the discussions within our vibrant startup community.
          </FaqItem>
          <FaqItem label="How can I manage my personal data?">
            To deactivate your account, please go to your <a className="text-highlight">Settings page</a>, then select “Continue” next to “Taking a break from Startup?” at the bottom of the page.
          </FaqItem>
        </div>
      </div>
    </div>
  )
}

export default Faq