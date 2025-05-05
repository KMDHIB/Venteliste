export const questions = [
    {
      "id": 1,
      "type": "text",
      "question": "Navn",
      "answer": ""
    },
    {
      "id": 2,
      "type": "number",
      "question": "Alder",
      "answer": null
    },
    {
      "id": 2,
      "type": "number",
      "question": "Startår",
      "answer": null,
      "conditional": {
        "2024": [
          {
            "id": 5,
            "type": "boolean",
            "question": "Har du været til rundvisning?",
            "answer": ""
          }
        ],
        "2025": [
          {
            "id": 5,
            "type": "boolean",
            "question": "Kommer du til rundvisning i marts 2024?",
            "answer": ""
          }
        ]
      }
    },
    {
      "id": 3,
      "type": "boolean",
      "question": "Har du en hest?",
      "answer": null,
      "conditional": {
        "true": [
          {
            "id": 5,
            "type": "boolean",
            "question": "Spiser den gulerødder?",
            "answer": ""
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
  ];
