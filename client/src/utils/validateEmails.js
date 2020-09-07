const re = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export default (emails) => {
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email=> (re.test(email) === false)
        );
        //Try to capture invalid emails, hence filter funciton returns true if you want the item to be included in array
    
    if(invalidEmails.length){
        return `These emails are invalid: ${invalidEmails}`;
    }
    return ;
}