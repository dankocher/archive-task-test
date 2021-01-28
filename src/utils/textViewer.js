const textViewer = (text, aliases) => {
    for (let alias in aliases) {
        text = text.replace(`{{${alias}}}`, aliases[alias])
    }

    return text
}

export default textViewer
