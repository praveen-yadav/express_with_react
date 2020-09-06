const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email=> (re.test(email) === false)
        );
        //Try to capture invalid emails, hence filter funciton returns true if you want the item to be included in array
    
    console.log(emails);
    console.log(invalidEmails);
    if(invalidEmails.length){
        return `These emails are invalid: ${invalidEmails}`;
    }
    return ;
}