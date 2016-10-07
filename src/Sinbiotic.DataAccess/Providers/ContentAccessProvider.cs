using System;
using System.Collections.Generic;
using System.Linq;
using Sinbiotic.Models.Interface;
using Sinbiotic.Models.Dtos;
using Microsoft.Extensions.Logging;


namespace Sinbiotic.DataAccess.Providers
{
    // >dotnet ef migration add testMigration
    public class ContentAccessProvider : IContent
    {
        private readonly DomainModelContext _context;
        private readonly ILogger _logger;

        public ContentAccessProvider(DomainModelContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("ContentAccessProvider");
        }

        public Content AddContent(Content dataContent)
        {
            _context.ContentModel.Add(dataContent);
            _context.SaveChanges();
            return dataContent;
        }

        public Content UpdateContent(long Id, Content dataContent)
        {
            try
            {
                _context.ContentModel.Update(dataContent);
                _context.SaveChanges();
                return dataContent;
            }
            catch
            {
                return null;
            }
        }

        public bool DeleteContent(long Id)
        {
            try
            {
                var entity = _context.ContentModel.First(obj => obj.Id == Id);
                _context.ContentModel.Remove(entity);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }

        }

        public Content GetContent(long Id)
        {
            try
            {
                return _context.ContentModel.First(obj => obj.Id == Id);
            }
            catch
            {
                return null;
            }
        }

        public List<Content> GetContentList()
        {
            return _context.ContentModel.ToList();
        }
    }
}
