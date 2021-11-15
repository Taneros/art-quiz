import Templates from './templates/templates'

/***
 *
 * task of view is to get the templateName
 *
 * combine data and template
 *
 */

export default {
  render(templateName, templates) {
    // console.log(Templates[templateName])
    const content = Templates[templateName]

    // TODO
    /**
     * template {{}} replacement logic <- take from HTML builder
     */
    return content
  },
}
