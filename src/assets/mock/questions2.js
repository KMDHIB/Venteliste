export const questions = [
    {
      "id": 1,
      "type": "text",
      "question": "What is your name?",
      "answer": ""
    },
    {
      "id": 2,
      "type": "number",
      "question": "How old are you?",
      "answer": null
    },
    {
      "id": 3,
      "type": "boolean",
      "question": "Do you play football?",
      "answer": null,
      "conditional": {
        "true": [
          {
            "id": 4,
            "type": "text",
            "question": "Which position do you play?",
            "answer": "",
            "conditional": {
              "Forward": [
                {
                  "id": 5,
                  "type": "text",
                  "question": "How many goals have you scored?",
                  "answer": "",
                  "conditional": {
                    "32": [
                      {
                        "id": 5,
                        "type": "boolean",
                        "question": "Really",
                        "answer": ""
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      "id": 6,
      "type": "checkbox",
      "question": "Which sports do you play?",
      "options": ["Football", "Basketball", "Tennis"],
      "answer": []
    },
    {
      "id": 7,
      "type": "select",
      "question": "What is your favorite fruit?",
      "options": ["Apple", "Banana", "Orange", "Strawberry"],
      "answer": "",
      "conditional": {
        "Apple": [
          {
            "id": 8,
            "type": "text",
            "question": "Why do you like apples?",
            "answer": ""
          }
        ]
      }
    }
  ]
