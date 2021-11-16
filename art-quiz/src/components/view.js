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
    console.log('\nview', templateName, templates)
    let content = Templates[templateName]

    // TODO
    /**
     * template {{}} replacement logic <- take from HTML builder
     */

    // get template names
    let templateItems = content.match(/[^{\}]+(?=})/gm) || []
    // console.log(templateItems)

    if (templateItems.length) {
      templateItems.forEach((item, idx) => {
        // console.log('item', item)
        let regexp = new RegExp(`{{${item}}}`, 'g')
        // console.log('regex', regexp);
        // console.log('templates.item')
        content = content.replace(regexp, templates[`${item}`])
        // console.log(content)
      })
    }

    return content
  },
}
