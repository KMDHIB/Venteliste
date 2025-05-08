export interface Registration {
    Id: number;
    Name: string;
    BirthDay: string;
    SchoolStart: string;
    SchoolClass: number;
    NumberOfSchoolYears: number;
    Comments: string | null;
    CurrentSchool: string | null;
    Files: any[];
    Kindergarten: {
        KindergartenYear: number | null;
        KindergartenMonth: number | null;
    };
    Siblings: any[];
    Status: string;
    LineCourse: string | null;
    SpecialFields: string[];
    ParentOne: {
        Name: string;
        Email: string | null;
        Mobile: string;
        WorkPhone: string;
        Address: string;
        PostalCode: number;
        HasCustody: boolean;
        Notify: boolean;
        HasValidCpr: boolean;
    };
    ParentTwo: {
        Name: string | null;
        Email: string | null;
        Mobile: string | null;
        WorkPhone: string | null;
        Address: string | null;
        PostalCode: number;
        HasCustody: boolean;
        Notify: boolean;
        HasValidCpr: boolean;
    };
    PaymentDue: number;
    OtherContact: {
        Name: string | null;
        Email: string | null;
        Mobile: string | null;
        WorkPhone: string | null;
        Address: string | null;
        PostalCode: number;
        HasCustody: boolean;
        Notify: boolean;
        HasValidCpr: boolean;
    };
    IsLocked: boolean;
};
