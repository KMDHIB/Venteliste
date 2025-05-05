export function storeData(key, obj, temp = true) {
  temp
    ? sessionStorage.setItem(key, JSON.stringify(obj))
    : localStorage.setItem(key, JSON.stringify(obj));
}

export function getData(key, temp = true) {
  return JSON.parse(
    (temp ? sessionStorage.getItem(key) : localStorage.getItem(key)) || '{}'
  );
}

export function removeData(key, temp = true) {
  return temp ? sessionStorage.removeItem(key) : localStorage.removeItem(key);
}

export function formatName(fullName) {
  if (!fullName) {
    return "";
  }

  const names = fullName.split(" ");
  const formattedNames = new Array();

  for (const name of names) {
    formattedNames.push(
      name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase()
    );
  }

  return formattedNames.join(" ");
}

export function addStyleSheet(stylesheet) {
  const style = document.createElement("style");
  style.textContent = stylesheet;
  document.head.append(style);
}

export function translateMonth(monthNumber) {
  switch (monthNumber) {
    case 2:
      return "Februar";
    case 3:
      return "Marts";
    case 4:
      return "April";
    case 5:
      return "Maj";
    case 6:
      return "Juni";
    case 7:
      return "Juli";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "Oktober";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "Januar";
  }
}

export function validateEmail(email) {
  return (
    email?.length === 0 ||
    /^(?!.*\.{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  );
}

export function validatePhoneNumber(phoneNumber) {
  phoneNumber = phoneNumber.replace(/ /g, "");

  return phoneNumber?.length === 0 || /^[0-9+]{8,17}$/.test(phoneNumber);
}

export function validateCPR(cpr) {
    return true;
//   cpr = cpr.replace(/[ \D]/gi, "");

//   if (!(cpr?.length === 10)) {
//     return false;
//   }

//   let mainNumber = 0;

//   factors = [4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

//   for (let ciffer = 0; ciffer < $cpr.length; ciffer++) {
//     mainNumber += parseInt(cpr.substr(ciffer, 1)) * factors[ciffer];
//   }

//   return mainNumber % 11 == 0;
}

export function calculateAge(DateOfBirth) {
  const birthday = new Date(DateOfBirth);
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return isNaN(age) ? 0 : age;
}

export function getErrorMessage(exceptionType) {
  switch (exceptionType) {
    case "System.AuthenticationException":
      return `Der skete en fejl i forbindelse med login. 
                                                           Fejlen er logget og vi arbejder aktivt på at løse problemet. 
                                                           Fejlen kan muligvis skyldes ustabilitet hos os eller en af vores tredjepartstjenester.                                                    
                                                           I mellemtiden anbefaler vi dig at prøve igen senere. 
                                                           Hvis problemet fortsætter, eller hvis du har yderligere spørgsmål, 
                                                           opfordrer vi dig til at kontakte skolen. 
                                                           Vi beklager eventuelle ulejligheder dette kan have medført.`;
    case "Ventelisten.Web.ChildIndexException":
      return `Vi beklager, men det ser ud til, at der ikke er nogen børn registreret din folkeregisteradresse. 
                                                            For at kunne opskrive dit barn via ventelisten.net, skal dit barn bo på din adresse. 
                                                            Vi opfordrer dig til at kontakte skolen for at få oplysninger om alternative metoder til at opskrive dit barn. 
                                                            Vi beklager eventuelle ulejligheder dette kan have medført.`;
    case "Ventelisten.Web.CprRegisterException":
      return `Vi beklager, men det ser ud til, at du ikke er aktiv i det danske CPR-register.
                                                            Dette kan f.eks. skyldes, at du ikke har bopæl i Danmark.
                                                            For at kunne opskrive dit barn via ventelisten.net, skal du bo i Danmark
                                                            samt have forældremyndighed over et barn, der bor på din adresse.
                                                            Vi opfordrer dig til at kontakte skolen for at få oplysninger om alternative metoder til at opskrive dit barn. 
                                                            Vi beklager eventuelle ulejligheder dette kan have medført.`;
    case "NoChildren":
      return `Vi beklager, men det ser ud til, at der ikke er nogen børn registreret din folkeregisteradresse. 
                                                            For at kunne opskrive dit barn via ventelisten.net, skal dit barn bo på din adresse. 
                                                            Vi opfordrer dig til at kontakte skolen for at få oplysninger om alternative metoder til at opskrive dit barn. 
                                                            Vi beklager eventuelle ulejligheder dette kan have medført.`;
    case "CancelledPayment":
      return `Betalingen blev annulleret. For at fuldføre opskrivningen skal du logge ind igen. 
                                             Vi beklager eventuelle ulejligheder dette kan have medført.`;
    case "PaymentError":
      return `Der opstod en upspecificeret fejl i forbindelse med betalingen, som ikke blev gennemført. 
                                         For at fuldføre opskrivningen skal du logge ind igen. 
                                         Vi beklager eventuelle ulejligheder dette kan have medført.`;
    case "InvalidTransaction":
      return `Betalingen blev afvist af vores samarbejdspartner Nets Easy.  
                                               For at fuldføre opskrivningen skal du logge ind igen. 
                                               Vi beklager eventuelle ulejligheder dette kan have medført.`;
    case "PostError":
      return `Der er sket en fejl i forbindelse med opskrivningen til ventelisten.net. 
                                      Fejlen er logget og vi arbejder aktivt på at løse problemet. 
                                      Fejlen kan muligvis skyldes ustabilitet hos os eller en af vores tredjepartstjenester.                                  
                                      I mellemtiden anbefaler vi dig at prøve igen senere. 
                                      Hvis problemet fortsætter, eller hvis du har yderligere spørgsmål, 
                                      opfordrer vi dig til at kontakte skolen. 
                                      Vi beklager eventuelle ulejligheder dette kan have medført.`;
    default:
      return `Der er sket en fejl i forbindelse med hentning af data til ventelisten.net. 
                           Fejlen er logget og vi arbejder aktivt på at løse problemet. 
                           Fejlen kan muligvis skyldes ustabilitet hos os eller en af vores tredjepartstjenester.                                  
                           I mellemtiden anbefaler vi dig at prøve igen senere. 
                           Hvis problemet fortsætter, eller hvis du har yderligere spørgsmål, 
                           opfordrer vi dig til at kontakte skolen. 
                           Vi beklager eventuelle ulejligheder dette kan have medført.`;
  }
}
