export const getIcon = (filename) => {
    const extension = filename.split('.').pop();

    const codeTypes = ['code', 'json', 'markdown', 'html', 'css', 'js', 'php', 'python', 'java', 'c', 'cpp', 'hpp', 'h', 'csharp', 'go', 'ruby', 'swift', 'sql', 'xml', 'yaml', 'csv'];
    if(codeTypes.includes(extension)) return 'fa-file-code';

    if (extension === 'image') {
        return 'fa-image';
    } else if (extension === 'zip') {
        return 'fa-file-archive';
    } else if (extension === 'txt') {
        return 'fa-file-alt';
    } else if (extension === 'md') {
        return 'fa-file-alt';
    } else if (extension === 'ini') {
        return 'fa-cog';
    } else {
        return 'fa-file';
    }
};
