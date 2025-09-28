export const useAnalytics = () => {
  // Track page view
  const trackPageView = (path: string, title?: string) => {
    if (process.client) {
      // Exemple avec Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: path,
          page_title: title
        })
      }
    }
  }

  // Track custom event
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (process.client) {
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters)
      }
    }
  }

  // Track blog post view
  const trackBlogPost = (postTitle: string, postCategory?: string) => {
    trackEvent('blog_post_view', {
      post_title: postTitle,
      post_category: postCategory
    })
  }

  // Track contact form submission
  const trackContactForm = () => {
    trackEvent('contact_form_submission')
  }

  // Track language switch
  const trackLanguageSwitch = (fromLang: string, toLang: string) => {
    trackEvent('language_switch', {
      from_language: fromLang,
      to_language: toLang
    })
  }

  return {
    trackPageView,
    trackEvent,
    trackBlogPost,
    trackContactForm,
    trackLanguageSwitch
  }
}
