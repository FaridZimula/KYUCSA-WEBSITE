import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Reply, Send, User } from 'lucide-react';

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Mukasa',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Thank you KYUCSA for organizing such amazing workshops! The React tutorial really helped me with my final year project.',
      timestamp: '2 hours ago',
      likes: 12,
      replies: [
        {
          id: 101,
          author: 'Sarah Nakato',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
          content: 'Glad it was helpful! Feel free to reach out if you need any clarification on the concepts.',
          timestamp: '1 hour ago',
          likes: 5
        }
      ]
    },
    {
      id: 2,
      author: 'Grace Namusoke',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'The hackathon was incredible! Our team learned so much and made great connections. Looking forward to the next one.',
      timestamp: '5 hours ago',
      likes: 18,
      replies: []
    },
    {
      id: 3,
      author: 'David Ssemakula',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Could we have more AI/ML workshops? There\'s so much interest in this area among students.',
      timestamp: '1 day ago',
      likes: 25,
      replies: [
        {
          id: 102,
          author: 'Alex Mukwaya',
          avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
          content: 'Absolutely! We\'re planning a comprehensive AI/ML series for next semester. Stay tuned for announcements.',
          timestamp: '20 hours ago',
          likes: 8
        }
      ]
    },
    {
      id: 4,
      author: 'Linda Namukasa',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'The career fair was amazing! I got three interview invitations. Thank you for connecting us with industry professionals.',
      timestamp: '2 days ago',
      likes: 32,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'You',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: newComment,
        timestamp: 'Just now',
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleSubmitReply = (commentId) => {
    if (replyText.trim()) {
      const reply = {
        id: Date.now(),
        author: 'You',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: replyText,
        timestamp: 'Just now',
        likes: 0
      };
      
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply]
          };
        }
        return comment;
      }));
      
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return { ...reply, likes: reply.likes + 1 };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return comment;
      }));
    }
  };

  return (
    <section id="comments" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Community Discussion
          </h2>
          <p className="text-xl text-gray-600">
            Share your thoughts, ask questions, and connect with fellow students
          </p>
        </div>

        {/* New Comment Form */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts with the community..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows="3"
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              {/* Main Comment */}
              <div className="flex items-start space-x-4">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{comment.content}</p>
                  
                  {/* Comment Actions */}
                  <div className="flex items-center space-x-4 text-sm">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{comment.likes}</span>
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors"
                    >
                      <Reply className="h-4 w-4" />
                      <span>Reply</span>
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
                          rows="2"
                        />
                        <div className="flex justify-end space-x-2 mt-2">
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded transition-colors text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyText.trim()}
                            className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white px-4 py-1 rounded transition-colors text-sm"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start space-x-3 pl-4 border-l-2 border-gray-100">
                          <img
                            src={reply.avatar}
                            alt={reply.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="font-medium text-gray-900 text-sm">{reply.author}</h5>
                              <span className="text-xs text-gray-500">{reply.timestamp}</span>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                            <button
                              onClick={() => handleLike(reply.id, true, comment.id)}
                              className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors text-xs"
                            >
                              <ThumbsUp className="h-3 w-3" />
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Comments */}
        <div className="text-center mt-8">
          <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            Load More Comments
          </button>
        </div>
      </div>
    </section>
  );
};

export default Comments;