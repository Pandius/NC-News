const {expect} = require('chai');
const {formatDate, makeRefObj, formatComments} = require('../db/utils/utils');

describe('formatDate', () => {
  it('returns a new empty array for passed empty array', () => {
    expect(formatDate([])).to.eql([]);
    expect(formatDate([])).to.not.equal([]);
  });
  it('returns a single object array with changed dateFormat', () => {
    expect(
      formatDate([
        {
          title: 'Living in the shadow of a great man',
          topic: 'mitch',
          author: 'butter_bridge',
          body: 'I find this existence challenging',
          created_at: 1542284514171,
          votes: 100
        }
      ])
    ).to.eql([
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: new Date(1542284514171),
        votes: 100
      }
    ]);
  });
  it('returns a  multiple obcjects array with changed dateFormat', () => {
    expect(
      formatDate([
        {
          title: 'Living in the shadow of a great man',
          topic: 'mitch',
          author: 'butter_bridge',
          body: 'I find this existence challenging',
          created_at: 1542284514171,
          votes: 100
        },
        {
          title:
            "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
          topic: 'coding',
          author: 'jessjelly',
          body:
            'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
          created_at: 1500584273256
        },
        {
          title: '22 Amazing open source React projects',
          topic: 'coding',
          author: 'happyamy2016',
          body:
            'This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.',
          created_at: 1500659650346
        },
        {
          title: 'Making sense of Redux',
          topic: 'coding',
          author: 'jessjelly',
          body:
            'When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).',
          created_at: 1514093931240
        }
      ])
    ).to.eql([
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: new Date(1542284514171),
        votes: 100
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: new Date(1500584273256)
      },
      {
        title: '22 Amazing open source React projects',
        topic: 'coding',
        author: 'happyamy2016',
        body:
          'This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.',
        created_at: new Date(1500659650346)
      },
      {
        title: 'Making sense of Redux',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).',
        created_at: new Date(1514093931240)
      }
    ]);
  });
});

describe('makeRefObj', () => {
  it('returns and object for passed array', () => {
    expect(makeRefObj([])).to.eql({});
  });
  it('returns an reference object keyed by  item title for passed array with one object', () => {
    expect(
      makeRefObj([
        {
          article_id: 1,
          title: 'Making sense of Redux'
        }
      ])
    ).to.eql({
      'Making sense of Redux': 1
    });
  });
  it('returns an reference object keyed by each items title for passed array with multiple objects', () => {
    expect(
      makeRefObj([
        {
          article_id: 1,
          title: 'Making sense of Redux'
        },
        {
          article_id: 2,
          title: 'Making sense'
        },
        {
          article_id: 3,
          title: 'sense of Redux'
        }
      ])
    ).to.eql({
      'Making sense': 2,
      'Making sense of Redux': 1,
      'sense of Redux': 3
    });
  });
});

describe('formatComments', () => {
  it('returns and empty array when and empty array and empty object is passed', () => {
    const commentData = [];
    const articleRef = {};
    const actual = formatComments(commentData, articleRef);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it('returns and new array of formated comments for passed array of single comments object and reference object', () => {
    const commentData = [
      {
        comments_id: 1,
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'sense of Redux',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389
      }
    ];
    const articleRef = {'sense of Redux': 3};
    const actual = formatComments(commentData, articleRef);
    const expected = [
      {
        comments_id: 1,
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        article_id: 3,
        author: 'butter_bridge',
        votes: 14,
        created_at: new Date(1479818163389)
      }
    ];
    expect(actual).to.eql(expected);
  });
});
