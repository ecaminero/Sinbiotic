using System.Collections.Generic;
using Sinbiotic.Models.Dtos;

namespace Sinbiotic.Models.Interface
{
    public interface IContent
    {
        Content AddContent(Content dataContent);
        Content UpdateContent(long Id, Content dataContent);
        bool DeleteContent(long Id);
        Content GetContent(long Id);
        List<Content> GetContentList();
    }
}